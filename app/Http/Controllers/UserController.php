<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class UserController extends Controller
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

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
            'indivLevel' => '1-1',
            'multiWins' => 0,
            'money' => 0,
            'isAdmin' => $request->isAdmin
        ]);

        $user->items;

        return response()->json(
            $user,
            201
        );
    }

    public function login(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'username' => ['required', 'string'],
                'password' => ['required']
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }
        if (!Auth::attempt($request->all())) {
            return response()->json([
                'errors' => 'Incorrect username or password'
            ], 400);
        }
        $token = Auth::user()->createToken('CARLOS_EL_BOMBAS');
        return response()->json([
            'message' => 'User authenticated successfully',
            'token' => $token->plainTextToken
        ]);
    }

    public function currentUser() {
        return response()->json(
            Auth::user()
        );
    }
}
