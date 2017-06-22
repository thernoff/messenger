import classNames from 'classnames';

//import React from 'react';
//const PropTypes = React.PropTypes;
import React, {PropTypes} from 'react';

// Для данного компонента не требуется поддержки состояния, поэтому
// тело функции станет заменой метода render()
function Button(props){
    const cssclasses = classNames('Button', props.className);
    return props.href
        ? <a {...props} className={cssclasses} />
        : <button {...props} className={cssclasses} />;
}

//Можно функцию записать так
/*const Button = props =>
    props.href
        ? <a {...props} className={classNames('Button',
            props.className)} />
        : <button {...props} className={classNames('Button',
            props.className)} />*/

Button.propTypes = {
    href: PropTypes.string,
};

export default Button