import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

class Avatar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            src: props.src,
            size: props.size,
            form: props.form,
            online: true,
        };
    }

    render(){
        let online = this.state.online;
        return (
            <div className='Avatar'>
                <img className={classNames(
                        this.state.size, this.state.form, {'online' : online, 'offline': !online}
                    )} 
                    src={this.state.src}
                />
            </div>
        );
    }
}

Avatar.propTypes = {
    size: PropTypes.string,
    src: PropTypes.string,
    form: PropTypes.string,
    online: PropTypes.bool,
}

Avatar.defaultProps = {
    form: 'round',
    online: true,
};

export default Avatar