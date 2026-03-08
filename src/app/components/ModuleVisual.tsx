import { Drum, Music2, Users } from 'lucide-react';
import { RHYTHM_PATTERNS, STAFF_LINES, STAFF_POSITION_DATA } from '../lib/musicTheory';
import type { QuestionVisual, StaffPosition } from '../types';

const STAFF_VIEWBOX = { width: 820, height: 320 };
const STAFF_X1 = 250;
const STAFF_X2 = 720;
const TREBLE_CLEF_X = 168;
const TREBLE_CLEF_Y = 154;
/** X position for line (L) bubbles on the staff. */
const STAFF_BUBBLE_X = 278;
/** X position for space (S) bubbles, to the right of line bubbles so they don't overlap. */
const STAFF_SPACE_BUBBLE_X = 332;

function renderRhythmSymbol(symbol: string, index: number) {
  if (symbol === 'quarter') {
    return (
      <svg key={`${symbol}-${index}`} width="42" height="88" viewBox="0 0 42 88" fill="none">
        <ellipse cx="18" cy="66" rx="14" ry="11" fill="#3D4A5C" transform="rotate(-20 18 66)" />
        <rect x="26" y="14" width="4" height="54" rx="2" fill="#3D4A5C" />
      </svg>
    );
  }

  if (symbol === 'rest') {
    return (
      <svg key={`${symbol}-${index}`} width="40" height="88" viewBox="0 0 40 88" fill="none">
        <path
          d="M10 28H30L17 49H28L13 67"
          stroke="#E8524A"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg key={`${symbol}-${index}`} width="72" height="88" viewBox="0 0 72 88" fill="none">
      <ellipse cx="20" cy="66" rx="12" ry="10" fill="#F5A623" transform="rotate(-20 20 66)" />
      <ellipse cx="48" cy="66" rx="12" ry="10" fill="#F5A623" transform="rotate(-20 48 66)" />
      <rect x="28" y="16" width="4" height="52" rx="2" fill="#3D4A5C" />
      <rect x="56" y="16" width="4" height="52" rx="2" fill="#3D4A5C" />
      <path d="M30 18H58V32H30" fill="#3D4A5C" />
    </svg>
  );
}

function renderTrebleClef() {
  return (
    <text
      x={TREBLE_CLEF_X}
      y={TREBLE_CLEF_Y}
      fill="#2F4054"
      fontSize="146"
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily='"Bravura Text","Noto Music","Apple Symbols","Segoe UI Symbol",serif'
    >
      {'\u{1D11E}'}
    </text>
  );
}

function StaffShell({
  large,
  children,
}: {
  large?: boolean;
  children: React.ReactNode;
}) {
  return (
    <svg
      width={large ? '820' : '500'}
      height={large ? '320' : '220'}
      viewBox={`0 0 ${STAFF_VIEWBOX.width} ${STAFF_VIEWBOX.height}`}
    >
      <rect x="20" y="20" width="780" height="280" rx="34" fill="white" />
      <rect x="20" y="20" width="780" height="280" rx="34" fill="none" stroke="#DCE5EF" strokeWidth="2.5" />
      {STAFF_LINES.map((lineY) => (
        <line
          key={lineY}
          x1={STAFF_X1}
          y1={lineY}
          x2={STAFF_X2}
          y2={lineY}
          stroke="#42556D"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}
      {renderTrebleClef()}
      {children}
    </svg>
  );
}

function renderPillLabel({
  x,
  y,
  label,
  fill,
  width = 52,
}: {
  x: number;
  y: number;
  label: string;
  fill: string;
  width?: number;
}) {
  return (
    <g>
      <rect x={x} y={y - 12} width={width} height="24" rx="12" fill={fill} />
      <text
        x={x + width / 2}
        y={y + 4}
        fontSize="13"
        fill="white"
        fontFamily="Nunito"
        fontWeight="800"
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

function getPositionAccent(position: StaffPosition | undefined) {
  if (!position) {
    return '#4A90D9';
  }

  return position.startsWith('line') ? '#4A90D9' : '#52C98A';
}

function getCompactLabel(position: StaffPosition) {
  if (position.startsWith('line')) {
    return `L${position.slice(-1)}`;
  }

  return `S${position.slice(-1)}`;
}

function renderNamedStaffNote({
  x,
  position,
  color,
  label,
}: {
  x: number;
  position: StaffPosition;
  color: string;
  label?: string;
}) {
  const note = STAFF_POSITION_DATA[position];
  return (
    <g>
      <ellipse
        cx={x}
        cy={note.y}
        rx="18"
        ry="13"
        fill={color}
        transform={`rotate(-18 ${x} ${note.y})`}
      />
      <rect x={x + 16} y={note.y - 46} width="5" height="56" rx="2.5" fill={color} />
      {label ? renderPillLabel({ x: x - 24, y: note.y - 30, label, fill: color, width: 48 }) : null}
    </g>
  );
}

const NOTE_HEAD_X = 480;

function renderStaffNoteHead({ y, color = '#5F7086' }: { y: number; color?: string }) {
  return (
    <g key={y}>
      <ellipse
        cx={NOTE_HEAD_X}
        cy={y}
        rx="14"
        ry="10"
        fill={color}
        transform={`rotate(-18 ${NOTE_HEAD_X} ${y})`}
      />
      <rect x={NOTE_HEAD_X + 12} y={y - 42} width="4" height="48" rx="2" fill={color} />
    </g>
  );
}

export function ModuleVisual({ visual, large = false }: { visual: QuestionVisual; large?: boolean }) {
  if (visual.kind === 'staff-numbering') {
    const lineKeys = ['line5', 'line4', 'line3', 'line2', 'line1'] as const;
    const spaceKeys = ['space4', 'space3', 'space2', 'space1'] as const;
    const emphasizeData = visual.emphasize ? STAFF_POSITION_DATA[visual.emphasize] : null;
    const accentColor = getPositionAccent(visual.emphasize);
    const allPositions = [...lineKeys, ...spaceKeys].sort((a, b) => STAFF_POSITION_DATA[a].y - STAFF_POSITION_DATA[b].y);

    return (
      <StaffShell large={large}>
        {visual.showNoteNames
          ? allPositions.map((pos) => renderStaffNoteHead({ y: STAFF_POSITION_DATA[pos].y }))
          : null}
        {lineKeys.map((lineKey) => {
          const line = STAFF_POSITION_DATA[lineKey];
          const active = visual.emphasize === lineKey;
          return (
            <g key={lineKey}>
              {renderPillLabel({
                x: STAFF_BUBBLE_X,
                y: line.y,
                label: getCompactLabel(lineKey),
                fill: active ? '#4A90D9' : '#6E7F96',
                width: 44,
              })}
              {visual.showNoteNames
                ? (
                    <text
                      x="754"
                      y={line.y + 5}
                      fontSize="18"
                      fill={active ? '#2F4054' : '#6B7A8D'}
                      fontFamily="Nunito"
                      fontWeight="800"
                      textAnchor="middle"
                    >
                      {line.note}
                    </text>
                  )
                : null}
            </g>
          );
        })}

        {spaceKeys.map((spaceKey) => {
          const space = STAFF_POSITION_DATA[spaceKey];
          const active = visual.emphasize === spaceKey;
          return (
            <g key={spaceKey}>
              {renderPillLabel({
                x: STAFF_SPACE_BUBBLE_X,
                y: space.y,
                label: getCompactLabel(spaceKey),
                fill: active ? '#52C98A' : '#9AA7B8',
                width: 44,
              })}
              {visual.showNoteNames
                ? (
                    <text
                      x="754"
                      y={space.y + 5}
                      fontSize="18"
                      fill={active ? '#2F4054' : '#9D7B3D'}
                      fontFamily="Nunito"
                      fontWeight="800"
                      textAnchor="middle"
                    >
                      {space.note}
                    </text>
                  )
                : null}
            </g>
          );
        })}

        {emphasizeData ? (
          <>
            <rect
              x={STAFF_X1 - 14}
              y={emphasizeData.y - 10}
              width={STAFF_X2 - STAFF_X1 + 28}
              height="20"
              rx="10"
              fill={accentColor}
              opacity="0.14"
            />
            <circle
              cx={(visual.emphasize?.startsWith('space') ? STAFF_SPACE_BUBBLE_X : STAFF_BUBBLE_X) - 22}
              cy={emphasizeData.y}
              r="7"
              fill={accentColor}
            />
          </>
        ) : null}

        <rect x="214" y="238" width="392" height="34" rx="17" fill="#EEF4FA" />
        <text
          x="410"
          y="259"
          fontSize={emphasizeData ? 14 : 15}
          fill="#4C6178"
          fontFamily="Nunito"
          fontWeight="800"
          textAnchor="middle"
        >
          {emphasizeData
            ? `${getCompactLabel(visual.emphasize)} = ${emphasizeData.label}. L = line, S = space. Count from the bottom up.`
            : 'L = line, S = space. Count lines and spaces from the bottom up.'}
        </text>
      </StaffShell>
    );
  }

  if (visual.kind === 'staff-treble-names') {
    const lineKeys = ['line1', 'line2', 'line3', 'line4', 'line5'] as const;
    const spaceKeys = ['space1', 'space2', 'space3', 'space4'] as const;
    const lineXStart = 295;
    const lineXStep = 72;
    const spaceXStart = 328;
    const spaceXStep = 72;
    const noteFontSize = 16;
    const bubbleWidth = 28;
    const bubbleHeight = 20;
    const noteFontWeight = 400;
    const lineBubbleFill = '#4A90D9';
    const spaceBubbleFill = '#F5A623';
    return (
      <StaffShell large={large}>
        {lineKeys.map((key, i) => {
          const { y, note } = STAFF_POSITION_DATA[key];
          const x = lineXStart + i * lineXStep;
          return (
            <g key={key}>
              <rect
                x={x - bubbleWidth / 2}
                y={y - bubbleHeight / 2}
                width={bubbleWidth}
                height={bubbleHeight}
                rx={bubbleHeight / 2}
                fill={lineBubbleFill}
              />
              <text
                x={x}
                y={y}
                fill="white"
                fontSize={noteFontSize}
                fontFamily="Nunito"
                fontWeight={noteFontWeight}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {note}
              </text>
            </g>
          );
        })}
        {spaceKeys.map((key, i) => {
          const { y, note } = STAFF_POSITION_DATA[key];
          const x = spaceXStart + i * spaceXStep;
          return (
            <g key={key}>
              <rect
                x={x - bubbleWidth / 2}
                y={y - bubbleHeight / 2}
                width={bubbleWidth}
                height={bubbleHeight}
                rx={bubbleHeight / 2}
                fill={spaceBubbleFill}
              />
              <text
                x={x}
                y={y}
                fill="white"
                fontSize={noteFontSize}
                fontFamily="Nunito"
                fontWeight={noteFontWeight}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {note}
              </text>
            </g>
          );
        })}
      </StaffShell>
    );
  }

  if (visual.kind === 'staff-sequence') {
    return (
      <div className="flex flex-col items-center gap-4">
        {visual.title ? (
          <div style={{ fontWeight: 800, fontSize: '20px', color: '#3D4A5C' }}>{visual.title}</div>
        ) : null}
        <StaffShell large={large}>
          {visual.items.map((item, index) =>
            renderNamedStaffNote({
              x: 210 + index * 74,
              position: item.position,
              color: item.color,
              label: item.label,
            }),
          )}
        </StaffShell>
      </div>
    );
  }

  if (visual.kind === 'staff-note') {
    const note = STAFF_POSITION_DATA[visual.position];

    return (
      <StaffShell large={large}>
        <g>
          <ellipse
            cx="308"
            cy={note.y}
            rx="20"
            ry="14"
            fill={visual.color}
            transform={`rotate(-18 308 ${note.y})`}
          />
          <rect x="325" y={note.y - 48} width="5" height="58" rx="2.5" fill={visual.color} />
        </g>

        {visual.showLabel ? (
          <g>
            <rect x="360" y={note.y - 18} width="138" height="36" rx="18" fill="#3D4A5C" />
            <text
              x="429"
              y={note.y + 5}
              fontSize="16"
              fill="white"
              fontFamily="Nunito"
              fontWeight="700"
              textAnchor="middle"
            >
              {note.label}: {note.note}
            </text>
          </g>
        ) : null}
      </StaffShell>
    );
  }

  if (visual.kind === 'rhythm-pattern') {
    const pattern = RHYTHM_PATTERNS[visual.patternId as keyof typeof RHYTHM_PATTERNS];
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-end justify-center gap-5 rounded-[24px] bg-white px-8 py-6 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          {pattern.symbols.map((symbol, index) => renderRhythmSymbol(symbol, index))}
        </div>
        <div style={{ color: '#6B7A8D', fontWeight: 600, fontSize: '16px', textAlign: 'center' }}>
          {pattern.description}
        </div>
      </div>
    );
  }

  if (visual.kind === 'instrument-family') {
    const icon =
      visual.family === 'Brass' ? (
        <Music2 size={72} color="#F5A623" />
      ) : visual.family === 'Percussion' ? (
        <Drum size={72} color="#E8524A" />
      ) : (
        <Users size={72} color="#4A90D9" />
      );

    return (
      <div className="flex w-full max-w-[440px] flex-col items-center gap-4 rounded-[24px] bg-white px-8 py-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        {icon}
        <div style={{ fontWeight: 800, fontSize: '26px', color: '#3D4A5C' }}>{visual.instrument}</div>
        <div style={{ fontWeight: 600, fontSize: '18px', color: '#6B7A8D' }}>{visual.family} family</div>
        {visual.details?.length ? (
          <div className="flex flex-col gap-1">
            {visual.details.map((detail) => (
              <div key={detail} style={{ fontSize: '15px', color: '#6B7A8D' }}>
                {detail}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-[460px] flex-col gap-3 rounded-[24px] bg-white px-8 py-8 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      <div style={{ fontWeight: 800, fontSize: '28px', color: '#3D4A5C' }}>{visual.title}</div>
      {visual.lines.map((line) => (
        <div key={line} style={{ fontWeight: 600, fontSize: '18px', color: '#6B7A8D' }}>
          {line}
        </div>
      ))}
    </div>
  );
}
