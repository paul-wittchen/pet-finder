import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import ListPets from '../../components/pet/list/list.component';
import Adapter from 'enzyme-adapter-react-16';

describe('List Component', () => {
    test('renders', () => {
        const component = shallow(<ListPets/>);
        expect(component.exists()).toBe(true)
    })
})

Enzyme.configure({ adapter: new Adapter() });