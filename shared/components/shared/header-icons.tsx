import React from 'react'
import { Boxes,ShoppingCart, User } from 'lucide-react';

interface Props {
    className?:string
}

export const HeaderIcons: React.FC<Props> =({className}) => {
    return (
        <div className="flex text-white gap-5">
            <User/>
            <ShoppingCart/>
        </div>
    )
}