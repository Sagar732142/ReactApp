import React from "react"
import Header from "../components/Header"
import Hero from "../components/Hero"
import EventCategory from "../components/EventCategory"
import MainLayout from "../layouts/MainLayout"
import SwipperCategory from "../components/SwipperCategory"




export default function HomePage() {
    return (
        <MainLayout>
            <Hero />
            {/* <EventCategory /> */}
            <SwipperCategory />
        </MainLayout>
    )
}