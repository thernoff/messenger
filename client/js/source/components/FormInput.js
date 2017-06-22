import Rating from './Rating';
import React, {Component, PropTypes} from 'react';
import Suggest from './Suggest';

class FormInput extends Component {
    getValue() {
        return 'value' in this.refs.input
      ? this.refs.input.value
      : this.refs.input.getValue();
    }

    render() {
    const common = {
      id: this.props.id,
      ref: 'input',
      defaultValue: this.props.defaultValue,
      style: this.props.error ? {border: '1px solid red'} : {}
    };
    switch (this.props.type) {
      case 'year':
        return (
          <input
            {...common}
            type="number" 
            defaultValue={this.props.defaultValue || new Date().getFullYear()} />
        );
      case 'suggest':
        return <Suggest {...common} options={this.props.options} />;
      case 'rating':
        return (
          <Rating
            {...common}
            defaultValue={parseInt(this.props.defaultValue, 10)} />
        );
      case 'text':
        return <textarea {...common} />;
      default:
        if (this.props.error){
          //return <input {...common} style={{border: '1px solid red'}} type="text" />;
        }
        return <input {...common} type="text"/>;
    }
  }
}

FormInput.propTypes = {
    type: PropTypes.oneOf(['year', 'suggest', 'rating', 'text',
    'input']),
    id: PropTypes.string,
    options: PropTypes.array,
    // как в вариантах автозаполнения <option>
    defaultValue: PropTypes.any,
};

export default FormInput