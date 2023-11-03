import styles from './Button.module.scss'
import Link from 'next/link';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';

export default function Button({children, className='', id, deletebtn=false, ...props}) {
    let Comp = "button";
    if(props.href) {
        Comp = Link;
    }

    const [isOpen, setIsOpen] = useState(false);

    return <>
        {!deletebtn && <Comp className={`${styles.button} ${className}`} {...props} role="button">{children}</Comp>}
        {deletebtn && <>
            <Comp className={`${styles.button} ${className}`} id={id} onClick={() => setIsOpen(true)} {...props} role="button">{children}</Comp>
            <Tooltip
                className={styles.modal}
                anchorSelect= {`#${id}`}
                isOpen={isOpen}
                place="bottom"
                openOnClick
                clickable
            >
                <div className={`${styles.Confirmbox} flex flex-col justify-center items-center`}>
                    <h1>Bạn có chắc muốn xóa không ?</h1>
                    <div className='flex flex-row gap-4'>
                        <Button className={`${styles.deleteConfirm}`} onClick={() => {
                            deletebtn();
                            setIsOpen(false);
                        }}>Xóa</Button>
                        <Button className={styles.closeConfirm} onClick={() => setIsOpen(false)}>Hủy</Button>
                    </div>
                </div>
            </Tooltip>
        </>}
    </>
}

