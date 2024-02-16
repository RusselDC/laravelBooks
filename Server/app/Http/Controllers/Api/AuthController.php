<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $req)
    {
        $validate = Validator::make($req->all(),
            [
                'email'=>'string|required',
                'name'=>'string|required|min:6|max:26',
                'password'=>'string|required|min:8|max:16|confirmed',
                'password_confirmation'=>'string|required|min:8|max:16'

            ]);

        if($validate->fails())
        {
            return response()->json([
                'errors'=>$validate->messages()
            ],422);
        }


        $user = User::create([
            'name'=>$req->name,
            'email'=>$req->email,
            'password'=>$req->password
        ]);

        if($user)
        {
            return response()->json([
                'message'=>'User successfully registered'
            ],200);
        }

        return response()->json([
            'message'=>'Something went wrong, Please contact the system administrator'
        ],500);


    }

    public function login(Request $req)
    {
        $validate = Validator::make($req->all(),[
           'email'=>'string|required',
           'password' =>'string|required|min:8|max:16'
        ]);

        if($validate->fails())
        {
            response()->json([
                'message'=>'Invalid Credentials'
            ],422);
        }

        $user = Auth::attempt(['email'=>$req->email,'password'=>$req->password]);

        if($user)
        {
            $authUser = Auth::user();
            $token = $authUser->createToken('auth-token');
            return response()->json(
                [
                    'token'=>$token
                ],200
            );
        }else
        {
            return response()->json([
                'message'=>'Wrong Credentials'
            ],401);
        }

        return response()->json([
            'message'=>'Something went wrong'
        ],500);



    }

    public function user(Request $req)
    {
        $user = User::find(Auth::user()->id);



        return response()->json([
            'books' => $user->books,
            'user' => $user
        ], 200)->header('Content-Type', 'application/json; charset=utf-8');
    }
}
