import Diwali from "../assets/image/DIWALY.jpg"
import Holi from "../assets/image/holy2.jpg"
import Xmas from "../assets/image/xmas.jpg"
import Bday from "../assets/image/bday.jpg"
import Jmas from "../assets/image/janmastomi.jpg"
import Rakhi from "../assets/image/rakhi.jpg"
import Bhai from "../assets/image/vai-fota.jpg"
import EID from "../assets/image/Eid.jpg"
import AKP from "../assets/image/any kind of pujo.jpg"
import Guru from "../assets/image/gurunanak.jpg"
import { ShoppingCart } from 'lucide-react'
import CategoryCard from "./CategoryCard"

export const eventData = [
    { title: "Diwali", image: Diwali },
    { title: "Holi", image: Holi },
    { title: "Christmas", image: Xmas },
    { title: "Birthday", image: Bday },
    { title: "Janmastomi", image: Jmas },
    { title: "Any kind of puja", image: AKP },
    { title: "Raksha Bandhan", image: Rakhi },
    { title: "Bhai-Fota", image: Bhai },
    { title: "Eid", image: EID },
    { title: "GuruPurav", image: Guru }
]

export default function EventCategory() {
    return (
        <section id="material1" className="section-p1">
            <h1>Chose Your Event</h1>
            <div className="container py-5">
                <div className="row">
                    {
                        eventData.map((item, index) => (
                            <CategoryCard
                                key={index}
                                image={item.image}
                                title={item.title}
                                description={"Celebrate the festival of lights with amazing gifts."}
                                link={"#"}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}