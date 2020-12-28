import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreatePet from '../../components/pet/create/create.component';
import FormCreate from '../../components/pet/create/createForm.component';

Enzyme.configure({ adapter: new Adapter() });

describe('Create Pet', () => {
    const wrapper = shallow(<CreatePet/>)

    it('changes petName', () => {
        expect(wrapper.find(<FormCreate/>)).toBe(true)
    })
})