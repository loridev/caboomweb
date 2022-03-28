<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request)
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

        $userExists = User::where('email', $request->email)->orWhere('username', $request->username)->first();

        if (!is_null($userExists)) {
            return response()->json(
                [
                    'errors' => 'User already exists!'
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
            'money' => 0,
            'isAdmin' => $request->isAdmin
        ]);

        return response()->json(
            $user,
            201
        );
    }

    public function login(Request $request)
    {
        $userToLogin = User::where('username', $request->username)->first();
        if (is_null($userToLogin) || !password_verify($request->password, $userToLogin->password)) {
            return response()->json([
                'errors' => 'Username or password is incorrect!'
            ], 400);
        }

        $token = $userToLogin->createToken('CARLOS_EL_BOMBAS');

        return response()->json([
            'message' => 'User authentified successfully!',
            'token' => $token->plainTextToken
        ]);
    }
}
