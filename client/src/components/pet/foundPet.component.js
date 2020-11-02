import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';

export default class FoundPet extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }
    
      render() {
          return(
            <ImageUploader
                withIcon={true}
                buttonText='Select image'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.png']}
                maxFileSize={5242880}
                withPreview={true}
            />
          )
      }
}
