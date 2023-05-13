export default function LoadingPlaceholder (props) {
    return (
        <div className="placeholder" style={{ height: props.height }}>
            <div className="animated-background" style={{ height: props.height }}></div>
        </div>
    );
}