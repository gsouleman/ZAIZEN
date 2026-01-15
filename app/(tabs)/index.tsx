import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* 
  CNN Theme Inspiration:
  - Header: Red background (#CC0000), White text, Bold Logo
  - Layout: Clean white background, black text, sharp borders
  - Typography: Sans-serif (System), high contrast
*/

const LINKS = [
  {
    id: 'personal',
    title: 'Personal Estate',
    description: 'Manage your personal assets and dashboard securely.',
    url: 'https://ghouenzen.onrender.com/dashboard',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=3024&auto=format&fit=crop', // Office/Finance
    category: 'Analysis',
    featured: true,
  },
  {
    id: 'njikam',
    title: 'Njikam Estate',
    description: 'Campost Biling - Family heritage and property management.',
    url: 'https://campost-biling.onrender.com/',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2873&auto=format&fit=crop', // Building
    category: 'Property',
  },
  {
    id: 'family',
    title: 'Family',
    description: 'Centralized family wealth and inheritance tracking.',
    url: 'https://family-cw0o.onrender.com/dashboard',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2924&auto=format&fit=crop', // Family/Group
    category: 'Wealth',
  },
  {
    id: 'cooperate',
    title: 'Cooperate',
    description: 'Enterprise solutions for estate planning. Coming Soon.',
    url: '',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop', // Skyscraper
    category: 'Business',
    disabled: true,
  },
];

export default function PortalScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const handleLinkPress = (url: string) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
    }
  };

  const featuredLink = LINKS.find((link) => link.featured);
  const otherLinks = LINKS.filter((link) => !link.featured);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style="light" backgroundColor={colors.primary} />

      {/* CNN-Style Red Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerContent}>
          <ThemedText style={styles.logoText}>ZAIZEN</ThemedText>
          <View style={styles.editionBadge}>
            <ThemedText style={styles.editionText}>ESTATE</ThemedText>
          </View>
        </View>
        <View style={styles.menuIcon}>
          {/* Simple lines for menu icon */}
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Top Story (Featured) */}
        {featuredLink && (
          <Pressable
            style={styles.featuredContainer}
            onPress={() => handleLinkPress(featuredLink.url)}
          >
            <ThemedText style={[styles.categoryLabel, { color: colors.primary }]}>{featuredLink.category.toUpperCase()}</ThemedText>
            <ThemedText style={[styles.featuredTitle, { color: colors.text }]}>{featuredLink.title}</ThemedText>

            <View style={styles.featuredImageContainer}>
              <Image source={{ uri: featuredLink.image }} style={styles.featuredImage} contentFit="cover" />
            </View>

            <ThemedText style={[styles.featuredDescription, { color: colors.icon }]}>
              {featuredLink.description}
            </ThemedText>
          </Pressable>
        )}

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Headlines (Grid/List) */}
        <View style={styles.headlinesContainer}>
          <ThemedText style={[styles.sectionTitle, { color: colors.primary }]}>MORE NEWS</ThemedText>

          {otherLinks.map((link) => (
            <Pressable
              key={link.id}
              style={[styles.newsItem, link.disabled && styles.disabledItem]}
              onPress={() => !link.disabled && handleLinkPress(link.url)}
            >
              <View style={styles.newsContent}>
                <ThemedText style={[styles.newsCategory, { color: colors.primary }]}>{link.category.toUpperCase()}</ThemedText>
                <ThemedText style={[styles.newsTitle, { color: colors.text }]}>{link.title}</ThemedText>
                <ThemedText style={[styles.newsDescription, { color: colors.icon }]}>{link.description}</ThemedText>
              </View>
              <View style={styles.thumbnailContainer}>
                <Image source={{ uri: link.image }} style={styles.thumbnail} contentFit="cover" />
              </View>
            </Pressable>
          ))}
        </View>

      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <ThemedText style={[styles.footerText, { color: colors.icon }]}>
          © 2026 Zaizen Estate. All Rights Reserved.
        </ThemedText>
        <ThemedText style={[styles.footerLink, { color: colors.text }]}>Terms of Use</ThemedText>
        <ThemedText style={[styles.footerLink, { color: colors.text }]}>Privacy Policy</ThemedText>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
    fontFamily: 'System', // Use default system sans-serif
  },
  editionBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  editionText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#CC0000',
  },
  menuIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  menuLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  featuredContainer: {
    padding: 16,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 36,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  featuredImageContainer: {
    width: '100%',
    height: 220,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredDescription: {
    fontSize: 16,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    width: '92%',
    alignSelf: 'center',
    marginVertical: 8,
  },
  headlinesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#CC0000',
    alignSelf: 'flex-start',
    paddingBottom: 4,
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 16,
  },
  disabledItem: {
    opacity: 0.5,
  },
  newsContent: {
    flex: 1,
  },
  newsCategory: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    lineHeight: 22,
  },
  newsDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  thumbnailContainer: {
    width: 100,
    height: 75,
    backgroundColor: '#E0E0E0',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    gap: 12,
  },
  footerText: {
    fontSize: 12,
  },
  footerLink: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
