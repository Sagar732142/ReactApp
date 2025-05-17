import React from "react"
import Header from "../components/Header"
import Hero from "../components/Hero"
import EventCategory from "../components/EventCategory"
import MainLayout from "../layouts/MainLayout"




export default function HomePage() {
    return (
        <MainLayout>
            <Hero />
            <EventCategory />
        </MainLayout>
    )
}