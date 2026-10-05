import React from 'react';
import { View, StyleSheet, useWindowDimensions, SafeAreaView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';

export const ResponsiveContainer = ({
  children,
  hideBottomNav = false,
  hideSidebar = false,
}) => {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const isDesktop = width >= 860;

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        {isDesktop && !hideSidebar && <Sidebar />}

        <View style={styles.contentArea}>
          <View style={[styles.mainInner, isDesktop && styles.desktopMaxWidth]}>
            {children}
          </View>
          {!isDesktop && !hideBottomNav && <BottomNav />}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
  },
  contentArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },
  mainInner: {
    flex: 1,
    width: '100%',
  },
  desktopMaxWidth: {
    maxWidth: 1040,
    width: '100%',
    alignSelf: 'center',
  },
});
