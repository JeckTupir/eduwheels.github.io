package com.example.eduwheels.vehicle

import android.app.Activity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.eduwheels.R
import com.example.eduwheels.adapter.VehicleAdapter
import com.example.eduwheels.models.Vehicle

class Vehicles : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_vehicles)

        val vehicleList = listOf(
            Vehicle.Vehicle("Bus", "Volvo 9700 Grand L", "60", "JDS 755", "Available"),
            Vehicle.Vehicle("Bus", "Volvo 9700 Grand L", "60", "GHA 934", "Available"),
            Vehicle.Vehicle("Mini Bus", "Volvo 9700 Grand L", "60", "JDS 755", "Available"),
            Vehicle.Vehicle("Mini Bus", "Volvo 9700 Grand L", "60", "GHA 934", "Available"),
            Vehicle.Vehicle("Van", "Volvo 9700 Grand L", "60", "JDS 755", "Available"),
            Vehicle.Vehicle("Van", "Volvo 9700 Grand L", "60", "GHA 934", "Available")
        )

        val recyclerView = findViewById<RecyclerView>(R.id.vehicleRecycler)
        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = VehicleAdapter(vehicleList)
    }
}