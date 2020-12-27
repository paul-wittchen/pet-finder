import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import ListPets from '../../components/pet/list/list.component';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('List Component', () => {
    const wrapper = shallow(<ListPets/>);
    it('renders as expected', () => {
        expect(wrapper.exists()).toBe(true)
    })
    it('should not render PetCard', () => {
        expect(wrapper.find('div.pet__card').length).toEqual(0);
    })
})
