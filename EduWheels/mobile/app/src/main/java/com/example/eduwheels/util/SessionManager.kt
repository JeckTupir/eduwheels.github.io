package com.example.eduwheels.util

import android.content.Context
import android.content.SharedPreferences

class SessionManager(context: Context) {
    private val prefs: SharedPreferences =
        context.getSharedPreferences("user_session", Context.MODE_PRIVATE)

    companion object {
        private const val KEY_SCHOOL_ID = "schoolid"
    }

    fun saveSchoolId(schoolId: String) {
        prefs.edit().putString(KEY_SCHOOL_ID, schoolId).apply()
    }

    fun getSchoolId(): String? = prefs.getString(KEY_SCHOOL_ID, null)

    fun clearSession() {
        prefs.edit().clear().apply()
    }
}
