package com.example.eduwheels.user

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import com.example.eduwheels.DashBoard
import com.example.eduwheels.R

class LogIn : Activity() {
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_log_in) // update this if your XML file has a different name

        val loginButton = findViewById<Button>(R.id.loginButton)       // Set ID in XML if missing
        val signUpText = findViewById<TextView>(R.id.signUpLink)       // Set ID in XML if missing

        loginButton.setOnClickListener {
            // Perform login logic here
            // Example: Go to dashboard
            val intent = Intent(this, DashBoard::class.java)
            startActivity(intent)
        }

        signUpText.setOnClickListener {
            // Go to register activity
            val intent = Intent(this, Register::class.java)
            startActivity(intent)
        }
    }
}
