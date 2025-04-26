package com.example.eduwheels.api

import com.example.eduwheels.models.User
import retrofit2.Call
import retrofit2.http.*

interface RetrofitService {

    @POST("/users/signup")
    fun registerUser(@Body user: User): Call<User>

    @POST("/users/login")
    fun loginUser(@Body credentials: Map<String, String>): Call<Map<String, Any>>

    @GET("/users")
    fun getAllUsers(): Call<List<User>>

    @GET("/users/{schoolid}")
    fun getUserBySchoolId(@Path("schoolid") schoolId: String): Call<User>

    @PUT("/users/{schoolid}")
    fun updateUser(
        @Path("schoolid") schoolId: String,
        @Body updatedUser: User
    ): Call<User>
}
