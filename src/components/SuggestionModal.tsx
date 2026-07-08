import React, { useState } from 'react';
import { Linking, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { STRINGS } from '../i18n';
import { DEV_LINKS, NEUTRAL, RADII, SHADOWS } from '../theme';
import type { Lang } from '../types';

type Props = {
  visible: boolean;
  onClose: () => void;
  accent: string;
  lang: Lang;
};

/**
 * Modal for writing a free-text suggestion. Sending it opens the device's
 * mail app with the message prefilled, since the app has no backend of its
 * own to receive it.
 * Pre: none. Post: on send, `onClose` is called and the draft text is reset.
 */
export default function SuggestionModal({ visible, onClose, accent, lang }: Props) {
  const strings = STRINGS[lang];
  const [text, setText] = useState('');
  const canSend = text.trim().length > 0;

  const handleClose = () => {
    setText('');
    onClose();
  };

  const handleSend = () => {
    const subject = encodeURIComponent('Sugerencia SUSHITAP');
    const body = encodeURIComponent(text.trim());
    Linking.openURL(`mailto:${DEV_LINKS.suggestionsEmail}?subject=${subject}&body=${body}`);
    setText('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <Pressable style={styles.scrim} onPress={handleClose}>
        <Pressable style={[styles.card, SHADOWS.drawer]} onPress={() => {}}>
          <Text style={styles.title}>{strings.suggestions}</Text>
          <Text style={styles.hint}>{strings.suggestionsHint}</Text>

          <TextInput
            value={text}
            onChangeText={setText}
            placeholder={strings.suggestionsPlaceholder}
            placeholderTextColor={NEUTRAL.mutedTextFaint}
            multiline
            style={styles.input}
          />

          <View style={styles.buttonRow}>
            <Pressable style={[styles.cancelBtn, { borderColor: accent }]} onPress={handleClose}>
              <Text style={[styles.cancelText, { color: accent }]}>{strings.cancel}</Text>
            </Pressable>
            <Pressable
              onPress={handleSend}
              disabled={!canSend}
              style={[
                styles.sendBtn,
                canSend ? { backgroundColor: accent, ...SHADOWS.activePill } : { backgroundColor: NEUTRAL.disabledBg },
              ]}
            >
              <Text style={[styles.sendText, { color: canSend ? '#fff' : NEUTRAL.disabledText }]}>
                {strings.send}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: NEUTRAL.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: NEUTRAL.drawerBg,
    borderRadius: RADII.card,
    padding: 22,
    gap: 14,
  },
  title: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 22,
    color: NEUTRAL.textBrown,
  },
  hint: {
    fontFamily: 'Fredoka_500Medium',
    fontSize: 14,
    color: NEUTRAL.mutedTextSoft,
  },
  input: {
    minHeight: 110,
    borderRadius: RADII.pill,
    backgroundColor: NEUTRAL.pillInactiveBg,
    color: NEUTRAL.textBrown,
    fontFamily: 'Fredoka_500Medium',
    fontSize: 14,
    padding: 14,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: RADII.pill,
    borderWidth: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  cancelText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 15,
  },
  sendBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: RADII.pill,
    alignItems: 'center',
  },
  sendText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 15,
  },
});
