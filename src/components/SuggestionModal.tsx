import React, { useState } from 'react';
import { Linking, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { STRINGS } from '../i18n';
import { DEV_LINKS, RADII, SHADOWS } from '../theme';
import { useAppTheme } from '../ThemeContext';
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
  const { neutral, fonts } = useAppTheme();
  const [text, setText] = useState('');
  const canSend = text.trim().length > 0;

  const handleClose = () => {
    setText('');
    onClose();
  };

  const handleSend = () => {
    const subject = encodeURIComponent(strings.suggestionsSubject);
    const body = encodeURIComponent(text.trim());
    Linking.openURL(`mailto:${DEV_LINKS.suggestionsEmail}?subject=${subject}&body=${body}`);
    setText('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <Pressable style={[styles.scrim, { backgroundColor: neutral.overlay }]} onPress={handleClose}>
        <Pressable
          style={[styles.card, { backgroundColor: neutral.drawerBg }, SHADOWS.drawer]}
          onPress={() => {}}
        >
          <Text style={[styles.title, { color: neutral.textBrown, fontFamily: fonts.bold }]}>{strings.suggestions}</Text>
          <Text style={[styles.hint, { color: neutral.mutedTextSoft, fontFamily: fonts.medium }]}>{strings.suggestionsHint}</Text>

          <TextInput
            value={text}
            onChangeText={setText}
            placeholder={strings.suggestionsPlaceholder}
            placeholderTextColor={neutral.mutedTextFaint}
            multiline
            style={[styles.input, { backgroundColor: neutral.pillInactiveBg, color: neutral.textBrown, fontFamily: fonts.medium }]}
          />

          <View style={styles.buttonRow}>
            <Pressable style={[styles.cancelBtn, { borderColor: accent }]} onPress={handleClose}>
              <Text style={[styles.cancelText, { color: accent, fontFamily: fonts.semiBold }]}>{strings.cancel}</Text>
            </Pressable>
            <Pressable
              onPress={handleSend}
              disabled={!canSend}
              style={[
                styles.sendBtn,
                canSend ? { backgroundColor: accent, ...SHADOWS.activePill } : { backgroundColor: neutral.disabledBg },
              ]}
            >
              <Text style={[styles.sendText, { color: canSend ? '#fff' : neutral.disabledText, fontFamily: fonts.semiBold }]}>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    borderRadius: RADII.card,
    padding: 22,
    gap: 14,
  },
  title: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 22,
  },
  hint: {
    fontFamily: 'Fredoka_500Medium',
    fontSize: 14,
  },
  input: {
    minHeight: 110,
    borderRadius: RADII.pill,
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
