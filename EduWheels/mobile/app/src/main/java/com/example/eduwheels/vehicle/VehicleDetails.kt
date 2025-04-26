package com.example.eduwheels.vehicle

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import com.example.eduwheels.R
import com.example.eduwheels.booking.BookingForm

class VehicleDetails : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_vehicle_details)

        val brandInput = findViewById<TextView>(R.id.brandInput)
        val unitNameInput = findViewById<TextView>(R.id.unitNameInput)
        val capacityInput = findViewById<TextView>(R.id.capacityInput)
        val categoryInput = findViewById<TextView>(R.id.categoryInput)
        val statusInput = findViewById<TextView>(R.id.statusInput)
        val bookBtn = findViewById<Button>(R.id.bookNowBtn)

        // 🚧 Hardcoded placeholders
        brandInput.text = "Volvo"
        unitNameInput.text = "Volvo 9700 Grand L"
        capacityInput.text = "60"
        categoryInput.text = "Bus"
        statusInput.text = "Available"

        bookBtn.setOnClickListener {
            Toast.makeText(this, "Booking request sent!", Toast.LENGTH_SHORT).show()

            // Navigate to BookingForm activity
            val intent = Intent(this, BookingForm::class.java)
            startActivity(intent)
            finish() // optional if you want to close VehicleDetails screen after booking
        }

    }
}
