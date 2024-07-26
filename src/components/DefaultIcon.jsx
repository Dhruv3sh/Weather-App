import React from 'react'
import ReactAnimatedWeather from 'react-animated-weather';

const DefaultIcon = ({ icon = "CLEAR_DAY", color = "white", size = 70, animate = true }) => {
    return (
        <ReactAnimatedWeather
            icon={icon}
            color={color}
            size={size}
            animate={animate}
        />
    )
}

export default DefaultIcon;
