//import React from 'react';
//const Component = React.Component;
//const PropTypes = React.PropTypes;
import React, {Component, PropTypes} from 'react';

class Suggest extends Component{

    /*getValue() {
        return this.refs.lowlevelinput.value;
    }*/

    constructor(props) {
        super(props);
        this.state = {value: props.defaultValue};//это замена для метода  getInitialState(),который использовался до появления ES6
    }

    getValue() {
        return this.state.value; // 'ref' больше не используется
    }

    render() {
        const randomid = Math.random().toString(16).substring(2);
        return (
            <div>
                <input
                    list={randomid}
                    defaultValue={this.props.defaultValue}

                    // Атрибут  ref позволяет присваивать 
                    // имя конкретному экземпляру компонента React, 
                    // после чего ссылаться на него по этому имени.
                    //ref="lowlevelinput"
                    onChange={e => this.setState({value: e.target.value})}
                    id={this.props.id}
                />
                <datalist id={randomid}>{
                        this.props.options.map((item, idx) => 
                            <option value={item} key={idx} />
                        )
                    }</datalist>
            </div>
        );
    }
}

Suggest.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
}

export default Suggest