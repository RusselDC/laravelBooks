<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Books;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Nette\Schema\ValidationException;
use App\Models\User;

class BooksController extends Controller
{
    public function bookmark($id,$title)
    {
        $user = Auth::user();


        $book = Books::get()->where('Book_id',$id)->where('title',$title)->first();
        if(!$book)
        {
            $book = Books::create([
                'Book_id'=>$id,
                'title'=>$title
            ]);
        }


        $user->books()->attach($book);

        return response()->json([
            'message'=>'book has been bookmarked'
        ],200);
    }

    public function removeBookmark($id,$title)
    {
        $user = Auth::user();

        $book = Books::get()->where('Book_id',$id)->where('title',$title)->first();


        $user->books()->detach($book);

        return response()->json([
            'message'=>'book has been detached'
        ],200);

    }


}
