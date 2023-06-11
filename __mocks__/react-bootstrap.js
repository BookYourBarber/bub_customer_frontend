import React from "react"

const MockDropdownItem = (children, ...rest) => {
    <div data-testid="dropdown-item" {...rest} >
        {children}
    </div>
}


export const Dropdown = {
    Item: MockDropdownItem
}