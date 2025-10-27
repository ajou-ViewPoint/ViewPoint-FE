import style from './BillTag.module.scss';

function BillTag(props: { text: string }) {
    return <button className={style.container}>#{props.text}</button>;
}

export default BillTag;
