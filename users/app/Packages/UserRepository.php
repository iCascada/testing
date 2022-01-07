<?php

namespace App\Packages;

use App\Models\Role;
use App\Models\User;
use Common\Exceptions\Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;

class UserRepository
{
    private User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Get user by id
     *
     * @param int $id
     * @return User|null
     */
    public function getUser(int $id): ?User
    {
        return $this->user::find($id)->with(['department', 'role']);
    }

    /**
     * Get user by email
     *
     * @param string $email
     * @return User|null
     */
    public function getUserByEmail(string $email): ?User
    {
         return $this->user::where('email', $email)
             ->with(['department', 'role'])
             ->first();
    }

    /**
     * Register user
     */
    public function saveUser(array $data): User
    {
        $user = new User();

        $user->password = Hash::make($data['password']);
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->lastName = ucfirst($data['lastName']);
        $user->departmentId = $data['departmentId'];
        $user->roleId = Role::USER;
        $user->save();

        $user->setAttribute('department', $user->department->name);
        $user->setAttribute('role', $user->role->name);

        return $user;
    }
}
