import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../src/Components/Footer';
import '@testing-library/jest-dom/extend-expect';


describe("Footer", () => {
    test("render footer component", () => {
        
            const { getByText } = render(<Footer />);
            const copyrightText = getByText("© 2023 Individual Project Veljko Škrbić");
            expect(copyrightText).toBeInTheDocument();
    })
})