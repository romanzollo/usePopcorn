const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
};

const starContainerStyle = {
    display: 'flex',
    gap: '4px',
};

const textStyle = {
    margin: '0',
    lineHeight: '1',
};

export default function StarRating({ maxRating = 10 }) {
    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => i + 1).map((i) => (
                    <span key={i}>S{i}</span>
                ))}
            </div>
            <div style={textStyle}>10</div>
        </div>
    );
}
