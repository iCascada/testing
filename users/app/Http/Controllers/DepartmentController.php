<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Packages\DepartmentRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class DepartmentController extends Controller
{
    /**
     * Получить коллекцию департаментов
     *
     * @param DepartmentRepository $departmentRepository
     * @return JsonResponse
     */
    public function index(DepartmentRepository $departmentRepository): JsonResponse
    {
        return Response::json(
            $departmentRepository->getDepartments(),
        );
    }

    /**
     * Получить департамент по идентификатору
     *
     * @param DepartmentRepository $departmentRepository
     * @param int $departmentId
     * @return JsonResponse
     */
    public function show(DepartmentRepository $departmentRepository, int $departmentId): JsonResponse
    {
        return Response::json(
            $departmentRepository->getDepartment($departmentId),
        );
    }

//    /**
//     * Show the form for creating a new resource.
//     *
//     * @return JsonResponse
//     */
//    public function create(): JsonResponse
//    {
//        //
//    }
//
//    /**
//     * Store a newly created resource in storage.
//     *
//     * @param Request $request
//     * @return JsonResponse
//     */
//    public function store(Request $request): JsonResponse
//    {
//        //
//    }
//
//
//    /**
//     * Show the form for editing the specified resource.
//     *
//     * @param Department $department
//     * @return JsonResponse
//     */
//    public function edit(Department $department): JsonResponse
//    {
//        //
//    }
//
//    /**
//     * Update the specified resource in storage.
//     *
//     * @param Request $request
//     * @param Department $department
//     * @return JsonResponse
//     */
//    public function update(Request $request, Department $department): JsonResponse
//    {
//        //
//    }
//
//    /**
//     * Remove the specified resource from storage.
//     *
//     * @param Department $department
//     * @return JsonResponse
//     */
//    public function destroy(Department $department): JsonResponse
//    {
//        //
//    }
}
