<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Http\Response;
class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
    
        $employees = Employee::all();

        return response()->json($employees, Response::HTTP_OK);
    } catch (\Exception $e) {
        
        return response()->json(['error' => 'Failed to fetch employees'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
{
    try {
        $employee = new Employee();
        $employee->full_name = $request['full_name'];
        $employee->gender = $request['gender'];
        $employee->date_of_birth = $request['date_of_birth'];
        $employee->hire_date = $request['hire_date'];
        $employee->salary = $request['salary'];
        $employee->is_active = $request['is_active'];
        $employee->department_id = $request['department_id'];
        $employee->job_title = $request['job_title'];
        $employee->email_address = $request['email_address'];
        $employee->phone_number = $request['phone_number'];

        $employee->save();

        return response()->json(['message' => 'Employee created successfully'], Response::HTTP_CREATED);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $employee = Employee::find($id);
    
            if (!$employee) {
                return response()->json(['error' => 'Employee not found'], Response::HTTP_NOT_FOUND);
            }
    
            $employee->update($request->all());
    
            return response()->json(['message' => 'Employee updated successfully'], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
{
    try {
        // Find the employee by ID
        $employee = Employee::find($id);

        // Check if the employee exists
        if (!$employee) {
            // Return a not found response if the employee doesn't exist
            return response()->json(['error' => 'Employee not found'], Response::HTTP_NOT_FOUND);
        }

        // Delete the employee
        $employee->delete();

        // Return a success response
        return response()->json(['message' => 'Employee deleted successfully'], Response::HTTP_OK);
    } catch (\Exception $e) {
       
        return response()->json(['error' => 'Failed to delete employee'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
}
