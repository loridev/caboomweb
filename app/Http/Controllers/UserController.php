<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        response()->json(
            User::all()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'username' => 'required|string',
                'email' => 'required|email',
                'password' => 'required',
                'items' => 'array',
                'progress' => 'array',
                'isAdmin' => 'required|boolean'
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => 'Incorrect data format',
                    'errors' => $validator->errors()
                ],
                400
            );
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'items' => [],
            'progress' => [
                'indiv' => [
                    'worldNum' => 1,
                    'levelNum' => 1
                ],
                'multi' => 0
            ],
            'isAdmin' => $request->isAdmin
        ]);

        return response()->json(
            $user,
            201
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
