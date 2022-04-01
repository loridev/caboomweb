<?php

namespace App\Http\Controllers;

use App\Models\Rankings;
use App\Models\User;
use http\Env\Response;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RankingController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make(
            $request->all(),
            [
                'world_num' => 'required|integer|min:1|max:3',
                'level_num' => 'required|integer|min:1|max:4',
                'time' => 'required|integer|min:0',
                'user_id' => 'required|integer|min:0'
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => 'Wrong input data!',
                    'errors' => $validator->errors()
                ], 400
            );
        }

        if (!User::find($request->user_id)) {
            return response()->json(
                [
                    'error' => 'Ranking user not found!'
                ], 404
            );
        }

        $ranking = Rankings::create($request->all());
        $ranking->user;

        return response()->json(
            [
                'message' => 'Ranking added successfully!',
                'ranking' => $ranking
            ]
        );
    }

    public function getIndiv(Request $request)
    {
        $validator = Validator::make(
            $request->query(),
            [
                'world_num' => 'required|integer|min:1|max:3',
                'level_num' => 'required|integer|min:1|max:4',
                'page' => 'nullable|integer|min:1'
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => 'Wrong input data!',
                    'errors' => $validator->errors()
                ] , 400
            );
        }

        $rankings = [];

        if (!$request->query('page')) {
            $rankings = Rankings::query()->where('world_num', $request->query('world_num'))
                ->where('level_num', $request->query('level_num'))
                ->orderByDesc('time')
                ->get();
        } else {
            $rankings = Rankings::query()->where('world_num', intval($request->query('world_num')))
                ->where('level_num', intval($request->query('level_num')))
                ->orderByDesc('time')
                ->skip($request->query('page') * 5 - 5)->take(5)
                ->get();
        }

        return $this->processRankings($rankings, $request);
    }

    public function getMulti(Request $request) {
        $validator = Validator::make(
            $request->query(),
            [
                'page' => 'nullable|integer|min:1'
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => 'Wrong input data!',
                    'errors' => $validator->errors()
                ] , 400
            );
        }

        $rankings = [];

        if (!$request->query('page')) {
            $rankings = User::query()->orderBy('multi_wins')->get();
        } else {
            $rankings = User::query()->orderBy('multi_wins')
                ->skip($request->query('page') * 5 - 5)->take(5)
                ->get();
        }

        return $this->processRankings($rankings, $request);


    }

    /**
     * @param array $rankings
     * @param Request $request
     * @return JsonResponse
     */
    private function processRankings($rankings, Request $request): JsonResponse
    {
        if (count($rankings) === 0) {
            return response()->json(
                [
                    'error' => 'No rankings found!'
                ], 404
            );
        }

        $returnObj = [
            'message' => 'Rankings found',
            'rankings' => $rankings
        ];

        if (!$request->query('page')) {
            if (count($rankings) % 5 === 0) {
                $returnObj['numPages'] = count($rankings) / 5;
            } else {
                $returnObj['numPages'] = floor(count($rankings) / 5) + 1;
            }
        }

        return response()->json(
                $returnObj
        );
    }
}
