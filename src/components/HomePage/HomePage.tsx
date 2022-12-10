import React from 'react'
import { Category } from '../Category/Category'
import { HeroSection } from '../HeroSection/HeroSection'
import { NavBar } from '../NavBar/NavBar'
import { FeaturedProducts } from '../FeaturedProducts/FeaturedProducts'

export const HomePage = () => {
  return (
    <div>
        <NavBar/>
        <HeroSection/>
        <Category/>
        <FeaturedProducts/>
    </div>
  )
}
