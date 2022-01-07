<?php

declare(strict_types=1);

namespace App\Models;

use Common\Traits\CamelCasingModelAttributes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use CamelCasingModelAttributes;

    protected $connection = 'quiz_user';
    protected $table = 'quiz_users';

    protected $fillable = [
        'name',
        'email',
        'password',
        'last_name'
    ];

    protected $hidden = [
        'password',
        'created_at',
        'updated_at',
        'department_id',
        'role_id'
    ];

    public function department(): belongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function role(): belongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function toArray()
    {
        $result = [];

        $array = parent::toArray();
        $array['department'] = $array['department']['name'] ?? '';
        $array['role'] = $array['role']['name'] ?? '';

        foreach ($array as $key => $value) {
            $result[$this->toCamelCase($key)] = $value;
        }

        return $result;
    }
}
