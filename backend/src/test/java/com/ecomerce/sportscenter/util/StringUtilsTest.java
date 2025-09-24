package com.ecomerce.sportscenter.util;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class StringUtilsTest {

    @Test
    void testIsEmptyWithNull() {
        assertTrue(StringUtils.isEmpty(null));
    }

    @Test
    void testIsEmptyWithEmptyString() {
        assertTrue(StringUtils.isEmpty(""));
    }

    @Test
    void testIsEmptyWithBlankString() {
        assertTrue(StringUtils.isEmpty("   "));
    }

    @Test
    void testIsEmptyWithValidString() {
        assertFalse(StringUtils.isEmpty("hello"));
    }

    @Test
    void testIsNotEmptyWithNull() {
        assertFalse(StringUtils.isNotEmpty(null));
    }

    @Test
    void testIsNotEmptyWithEmptyString() {
        assertFalse(StringUtils.isNotEmpty(""));
    }

    @Test
    void testIsNotEmptyWithValidString() {
        assertTrue(StringUtils.isNotEmpty("hello"));
    }

    @Test
    void testCapitalizeFirstLetter() {
        assertEquals("Hello", StringUtils.capitalizeFirstLetter("hello"));
        assertEquals("World", StringUtils.capitalizeFirstLetter("world"));
        assertEquals("", StringUtils.capitalizeFirstLetter(""));
        assertNull(StringUtils.capitalizeFirstLetter(null));
    }

    @Test
    void testTruncateString() {
        assertEquals("Hello...", StringUtils.truncateString("Hello World", 5));
        assertEquals("Hello", StringUtils.truncateString("Hello", 10));
        assertEquals("", StringUtils.truncateString("", 5));
        assertNull(StringUtils.truncateString(null, 5));
    }
}
