import style from './BillTag.module.scss';

interface BillTagProps {
    tagText: string;
}

function BillTag({ tagText }: BillTagProps) {
    return <button className={style.container}>#{tagText}</button>;
}

export default BillTag;
