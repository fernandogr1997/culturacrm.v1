<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use \stdClass;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'password2' => 'required|string|min:8',

        ],[
            'name.required' => 'Campo nombre es obligatorio',
            'email.required' => 'Campo email es obligatorio',
            'email.unique' => 'Error el email ya existe.',
            'password.required' => 'Campo Contraseña es obligatorio',  
            'password.min' => 'Contraseña min 8 caracteres',  
            'password2.required' => 'Campo Confirmar Contraseña es obligatorio',  
            'password2.min' => 'Contraseña min 8 caracteres',  
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }
        if($request->password != $request->password2){
            return response()->json(['password' => 'No Coinciden las contraseñas!!']);
        }
        

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password'=> Hash::make($request->password,['rounds' => 12,])
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json([
                    'data' => $user,
                    'access_token' => $token, 
                    'token_type' => 'Bearer', 
                    'respuesta'=> 'Usuario '.$user->name.' registrado correctamente.'
                ]);
    }


    public function login(Request $request)
    {   
        $validator = Validator::make($request->all(),[
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',

        ],[
            'email.required' => 'Campo email es obligatorio',
            'password.required' => 'Campo Contraseña es obligatorio',  
            'password.min' => 'Contraseña min 8 caracteres',  
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        if(!Auth::attempt($request->only('email', 'password')))
        {
            return response()
                ->json(['respuesta' => 'Email y/o Contraseña incorrecta.']);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;


        return response()
            ->json([
                'message' => 'Hola ', $user->name,
                'accessToken' => $token,
                'token_type' => 'Bearer',
                'user'=>$user,
                
            ]);
    }

    public function token()
    {   
        
        $res = $_COOKIE;

        return $res;
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'logout correcto, el token fue eliminado'
        ];
    }
}
