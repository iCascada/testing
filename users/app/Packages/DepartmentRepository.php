<?php

namespace App\Packages;

use App\Models\Department;
use Illuminate\Database\Eloquent\Collection;

class DepartmentRepository
{
    private Department $department;

    public function __construct(Department $department)
    {
        $this->department = $department;
    }

    /**
     * Получить список всех отделов
     *
     * @return Collection<Department>|null
     */
    public function getDepartments(): ?Collection
    {
        return $this->department::all();
    }

    /**
     * Получить отдел по идентификатору
     *
     * @param int $departmentId
     * @return Department|null
     */
    public function getDepartment(int $departmentId): ?Department
    {
        return $this->department::find($departmentId);
    }

    public function createDepartment(Department $department)
    {

    }

    public function deleteDepartment(int $departmentId)
    {

    }

    public function updateDepartment()
    {

    }
}
