package com.example.eduwheels.adapter

import android.app.Activity
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.recyclerview.widget.RecyclerView
import com.example.eduwheels.R
import com.example.eduwheels.models.Vehicle
import com.example.eduwheels.user.LogIn
import com.example.eduwheels.vehicle.VehicleDetails

class VehicleAdapter(private val vehicles: List<Vehicle.Vehicle>) :
    RecyclerView.Adapter<VehicleAdapter.VehicleViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VehicleViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_vehicle, parent, false)
        return VehicleViewHolder(view)
    }

    override fun onBindViewHolder(holder: VehicleViewHolder, position: Int) {
        val vehicle = vehicles[position]
        holder.bind(vehicle)
    }

    override fun getItemCount(): Int = vehicles.size

    class VehicleViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        fun bind(vehicle: Vehicle.Vehicle) {
            itemView.findViewById<TextView>(R.id.vehicleType).text = vehicle.type
            itemView.findViewById<TextView>(R.id.vehicleName).text = vehicle.name
            itemView.findViewById<TextView>(R.id.capacity).text = "Capacity: ${vehicle.capacity}"
            itemView.findViewById<TextView>(R.id.plateNumber).text = "Plate Number: ${vehicle.plateNumber}"
            itemView.findViewById<TextView>(R.id.status).text = "Status: ${vehicle.status}"

            val bookButton = itemView.findViewById<Button>(R.id.bookbtn)
            bookButton.setOnClickListener {
                Toast.makeText(
                    itemView.context,
                    "Booking ${vehicle.name}...",
                    Toast.LENGTH_SHORT
                ).show()

                val context = itemView.context
                val intent = Intent(context, VehicleDetails::class.java)
                context.startActivity(intent)

                if (context is Activity) {
                    context.finish()
                }
            }


        }
    }

}
