package com.example.eduwheels.user

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import com.example.eduwheels.R
import com.example.eduwheels.user.LogIn // Update if your login activity has a different name or location

class Register : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_register)

        val registerButton = findViewById<Button>(R.id.registerButton)   // Add ID in XML
        val loginLink = findViewById<TextView>(R.id.loginRedirectText)  // Add ID in XML

        registerButton.setOnClickListener {
            // You can put your registration logic here
            // For now just go back to LoginActivity
            val intent = Intent(this, LogIn::class.java)
            startActivity(intent)
            finish()
        }

        loginLink.setOnClickListener {
            val intent = Intent(this, LogIn::class.java)
            startActivity(intent)
            finish()
        }
    }
}
