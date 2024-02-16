<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Comments extends Model
{
    use HasFactory;
    protected $table = 'comments';
    protected $fillable = [
        'content'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function books()
    {
        return $this->belongsTo(Books::class);
    }
}
