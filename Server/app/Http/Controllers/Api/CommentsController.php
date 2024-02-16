<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Books;
use Illuminate\Support\Facades\Auth;



class CommentsController extends Controller
{
    public function store($id,Request $request)
    {
        $validate = Validator::make($request->all(),
        [
            'content'=>'required|string|min:1|max:255'
        ]);

        if($validate->fails())
        {
            return response()->json([
                'message'=>'Invalid Comment',
                'data'=>$request->input('content')
            ],422);
        }

        $book = Books::where('Book_id',$id)->first();

        if(!$book)
        {
            $book = Books::create(['Book_id'=>$id]);
        }

        $comment = new Comments();

        $comment->content = $request->input('content');
        $comment->user_id = Auth::id();
        $comment->books_id = $book->id;
        $comment->save();

        if($comment)
        {
            return response()->json([
                'message'=>'comment saved'
            ],200);
        }

        return response()->json([
            'message'=>'Something went wrong'
        ],500);



    }


    public function getComments($id)
    {
        $book = Books::where('Book_id',$id)->first();

        if(!$book)
        {
            return response()->json([
                'comments'=>[]
            ],200);
        }

        $comments = Comments::where('books_id', $book->id)->with('user')->get();

        $formattedComments = $comments->map(function ($comment) {
            return [
                'content' => $comment->content,
                'user_name' => $comment->user->name
            ];
        });;

        return response()->json([
            'comments'=>$formattedComments
        ],200);

    }
}
