<?php

declare(strict_types=1);

namespace App\Models;

class Role extends BaseModel
{
    protected $fillable = ['name'];

    public const USER = 1;
    public const ADMIN = 2;
    public const MODERATOR = 3;
}
