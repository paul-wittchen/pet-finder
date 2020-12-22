import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import ListPets from '../../components/pet/list/list.component';
import Adapter from 'enzyme-adapter-react-16';

describe('List Component', () => {
    it('renders as expected', () => {
        const wrapper = shallow(<ListPets/>);
        expect(wrapper.exists()).toBe(true)
    })

    it('Div is not longer then 80 lines', () => {
        const wrapper = shallow(<ListPets/>);
        expect(wrapper.exists('.pets__list__empty')).toBe(true);
    })
})


Enzyme.configure({ adapter: new Adapter() });