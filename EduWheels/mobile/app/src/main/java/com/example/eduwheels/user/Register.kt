package com.example.eduwheels.user

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import com.example.eduwheels.R
import com.example.eduwheels.user.LogIn // Update if your login activity has a different name or location
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class Register : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_register)

        val firstName = findViewById<EditText>(R.id.firstName)
        val lastName = findViewById<EditText>(R.id.lastName)
        val repass = findViewById<EditText>(R.id.repassword)
        val schoolID = findViewById<EditText>(R.id.schoolId)
        val username = findViewById<EditText>(R.id.username)
        val password = findViewById<EditText>(R.id.password)
        val email = findViewById<EditText>(R.id.email)

        val registerButton = findViewById<Button>(R.id.registerButton)   // Add ID in XML
        val loginLink = findViewById<TextView>(R.id.loginRedirectText)  // Add ID in XML

        registerButton.setOnClickListener {
            if (!firstName.text.toString().isNullOrEmpty()
                && !lastName.text.toString().isNullOrEmpty()
                && !username.text.toString().isNullOrEmpty()
                && !password.text.toString().isNullOrEmpty()
                && !email.text.toString().isNullOrEmpty()
                && !repass.text.toString().isNullOrEmpty()
                && !schoolID.text.toString().isNullOrEmpty()
            ) {

                saveReg(
                    firstName.text.toString(),
                    lastName.text.toString(),
                    username.text.toString(),
                    password.text.toString(),
                    email.text.toString(),
                    password.text.toString(),
                    password.text.toString()
                )

                startActivity(
                    Intent(this, LogIn::class.java).apply {
                        putExtra("username", username.text.toString())
                        putExtra("password", password.text.toString())
                        putExtra("repass", repass.text.toString())
                        putExtra("firstName", firstName.text.toString())
                        putExtra("lastName", lastName.text.toString())
                        putExtra("schoolID", schoolID.text.toString())
                        putExtra("email", email.text.toString())
                    }
                )

            } else {
                loginLink.setOnClickListener {
//            val intent = Intent(this, LogIn::class.java)
//            startActivity(intent)
//            finish()
        }
            }

        }

//
    }

    private fun saveReg(
        username: String,
        password: String,
        repass: String,
        firstName: String,
        lastName: String,
        schoolID: String,
        email: String
    ) {
        val profileInfo = """{
        "username": "$username",
        "password": "$password",
        "firstName": "$firstName",
        "lastName": "$lastName",
        "repass": "$repass",
        "email": "$email"
        "schoolid": "$schoolID"
    }""".trimIndent()

        CoroutineScope(Dispatchers.IO).launch {
            try {
                val url =
                    java.net.URL("http://10.0.2.2:8080/users/signup")  // Replace with your IP if needed
                val connection = url.openConnection() as java.net.HttpURLConnection

                connection.requestMethod = "POST"
                connection.setRequestProperty("Content-Type", "application/json")
                connection.doOutput = true

                val outputStream = connection.outputStream
                val writer = outputStream.bufferedWriter()
                writer.write(profileInfo)
                writer.flush()
                writer.close()
                outputStream.close()

                val responseCode = connection.responseCode
                if (responseCode == java.net.HttpURLConnection.HTTP_CREATED) {
                    println("✅ Registered Successfully")
                } else {
                    println("❌ Registration failed: ${connection.responseMessage}")
                }

                connection.disconnect()
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}

