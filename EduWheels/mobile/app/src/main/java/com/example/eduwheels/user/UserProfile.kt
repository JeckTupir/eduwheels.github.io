package com.example.eduwheels.user

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.ImageView
import android.widget.PopupMenu
import com.example.eduwheels.R

class UserProfile : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_user_profile)

        val menuIcon = findViewById<ImageView>(R.id.headerMenu)

        menuIcon.setOnClickListener { view ->
            val popup = PopupMenu(this, view)
            popup.menuInflater.inflate(R.menu.dropdown_menu, popup.menu)

            popup.setOnMenuItemClickListener { item ->
                when (item.itemId) {
                    R.id.menu_profile -> {
                        val intent = Intent(this, UserProfile::class.java)
                        startActivity(intent)
                        true
                    }
                    R.id.menu_vehicle -> {
                        // startActivity(Intent(this, VehicleActivity::class.java))
                        true
                    }
                    R.id.menu_contact -> {
                        // Navigate to Contact
                        true
                    }
                    R.id.menu_about -> {
                        // Navigate to About Us
                        true
                    }
                    R.id.menu_help -> {
                        // Show help
                        true
                    }
                    else -> false
                }
            }

            popup.show()
        }

    }
}