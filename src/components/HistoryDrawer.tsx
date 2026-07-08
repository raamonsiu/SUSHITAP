import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NEUTRAL, RADII, SHADOWS } from '../theme';
import { STRINGS, formatSessionDate } from '../i18n';
import type { Lang, Session } from '../types';

type Props = {
  open: boolean;
  onClose: () => void;
  accent: string;
  softBg: string;
  lang: Lang;
  count: number;
  sessions: Session[];
  onFinalize: () => void;
  onNewSession: () => void;
};

/**
 * Content of the right drawer: the in-progress session card (finalize/start
 * new session actions) plus the scrollable list of past sessions.
 */
export default function HistoryDrawer({
  open,
  onClose,
  accent,
  softBg,
  lang,
  count,
  sessions,
  onFinalize,
  onNewSession,
}: Props) {
  const strings = STRINGS[lang];
  const canFinalize = count > 0;

  return (
    <View style={styles.content} pointerEvents={open ? 'auto' : 'none'}>
      <View style={styles.header}>
        <Text style={styles.title}>{strings.history}</Text>
        <Pressable onPress={onClose} accessibilityLabel="Cerrar" style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </Pressable>
      </View>

      <View style={[styles.card, { backgroundColor: softBg }]}>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>{strings.current}</Text>
          <Text style={[styles.cardCount, { color: accent }]}>{count}</Text>
        </View>

        <Pressable
          onPress={onFinalize}
          disabled={!canFinalize}
          style={[
            styles.finalizeBtn,
            canFinalize
              ? { backgroundColor: accent, ...SHADOWS.activePill }
              : { backgroundColor: NEUTRAL.disabledBg },
          ]}
        >
          <Text style={[styles.finalizeText, { color: canFinalize ? '#fff' : NEUTRAL.disabledText }]}>
            {strings.finalize}
          </Text>
        </Pressable>

        <Pressable onPress={onNewSession} style={[styles.newBtn, { borderColor: accent }]}>
          <Text style={[styles.newText, { color: accent }]}>{strings.newSession}</Text>
        </Pressable>
      </View>

      <View style={styles.listSection}>
        <Text style={[styles.sectionLabel, { color: accent }]}>{strings.sessionsTitle}</Text>
        {sessions.length > 0 ? (
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 8 }}>
            {sessions.map((session) => (
              <View key={session.id} style={styles.row}>
                <Text style={styles.rowWhen}>{formatSessionDate(session.start, lang)}</Text>
                <View style={styles.rowTotalGroup}>
                  <Text style={[styles.rowTotal, { color: accent }]}>{session.total}</Text>
                  <Text style={styles.rowUnit}>{strings.piecesShort}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.empty}>{strings.empty}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 24,
    color: NEUTRAL.textBrown,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: NEUTRAL.closeBtnBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 18,
    color: NEUTRAL.labelMuted3,
  },
  card: {
    borderRadius: RADII.card,
    padding: 18,
    gap: 14,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 13,
    color: NEUTRAL.labelMuted3,
  },
  cardCount: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 32,
    lineHeight: 32,
  },
  finalizeBtn: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: RADII.pill,
    alignItems: 'center',
  },
  finalizeText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 15,
  },
  newBtn: {
    width: '100%',
    paddingVertical: 11,
    borderRadius: RADII.pill,
    borderWidth: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  newText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 15,
  },
  listSection: {
    flex: 1,
    minHeight: 0,
    gap: 12,
  },
  sectionLabel: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: RADII.pill,
    backgroundColor: NEUTRAL.sessionRowBg,
  },
  rowWhen: {
    fontFamily: 'Fredoka_500Medium',
    fontSize: 14,
    color: NEUTRAL.linkText,
  },
  rowTotalGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  rowTotal: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 19,
  },
  rowUnit: {
    fontSize: 11,
    color: NEUTRAL.labelMuted5,
  },
  empty: {
    textAlign: 'center',
    color: NEUTRAL.labelMuted4,
    fontSize: 14,
    paddingVertical: 24,
  },
});
