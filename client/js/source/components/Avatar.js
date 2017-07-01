import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

class Avatar extends Component{
    constructor(props) {
        //console.log('===================CONSTRUCTOR===================');
        for (var key in props) {
            //console.log('props['+key+']=', props[key])
        }
        //console.log('===================/CONSTRUCTOR===================');
        super(props);
        this.state = {
            test: props.test,
            id: props.id,
            src: props.src,
            title: props.title,
            alt: props.alt,
            size: props.size,
            form: props.form,
            active: props.active,
            online: true,
        };
    }

    render(){
        let online = this.state.online;
        return (
            <div className={classNames('Avatar', {'active' : this.props.active})} >
                <img className={classNames(
                        this.state.size, this.state.form, {'online' : online, 'offline': !online}
                    )} 
                    src={this.state.src}
                    alt={this.state.alt}
                    title={this.state.title}
                    data-id={this.state.id ? this.state.id : ''}
                    onClick={this.props.onClick}
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
    active: PropTypes.bool,
}

Avatar.defaultProps = {
    title: '',
    alt: '',
    src: './avatars/no-avatar.jpg',
    form: 'round',
    active: false,
    online: true,
};

export default Avatar