<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $collection = 'users';

    /**
    * The database primary key value.
    *
    * @var string
    */
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password', 'items', 'progress', 'isAdmin'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $connection = 'mysql';

    public function items()
    {
        return $this->belongsToMany(Item::class, 'items_users', 'item_id', 'user_id');
    }

    public function rankings()
    {
        return $this->belongsToMany(Rankings::class, 'rankings_users', 'ranking_id', 'user_id');
    }
}
